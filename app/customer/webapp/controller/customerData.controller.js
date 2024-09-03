sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "customer/libs/stylexlsx",
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("customer.controller.customerData", {

        onUploadDialogPress: function () {
            var oFileUploader = this.byId("fileUploader");
            console.log(this);
            var oFileUploaderInput = document.getElementById(oFileUploader.getId() + "-fu");
            var file = oFileUploaderInput.files[0];
            var that = this;
    
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, { type: 'binary' });
                    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    var formattedData = jsonData.slice(1).map(function (row) {
                        return {
                            customer_id: row[0] || '',
                            customer_name: row[1] || '',
                            email: row[2] || '',
                            add: row[3] || ''
                        };
                    });

                    var jsonString = JSON.stringify(formattedData);

                    $.ajax({
                        url: "/odata/v4/jk/customerData", 
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({ jsonData: jsonString }),
                        success: function (response) {
                            sap.m.MessageToast.show("Data uploaded");
                            console.log(response);
                            var oDialog = that.byId("upload");
                            if (oDialog) {
                                oDialog.close();
                            }     
                                                                         	
                        },
                        error: function (error) {
                            console.error("Error : ", error);
                            sap.m.MessageToast.show("Error.");
                        }
                    });
                };
                
                reader.readAsBinaryString(file);
            }  else {
                MessageToast.show("Please choose a file first.");
            }
        },

        onDialogFileChange: function (oEvent) {
            var oSubmitButton = this.byId("Upload");
            oSubmitButton.setEnabled(!!oEvent.getSource().getValue());
        },

        onDialogCancelPress: function () {
            this.byId("upload").close();
        },

        onDialogDownloadPress: function () {
            var wb = XLSX.utils.book_new();
            var wsData = [["Customer ID", "Customer Name", "Email", "Address"]];
            var ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, "Template");

            var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }

            var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
            var url = URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.href = url;
            a.download = "customer_template.xlsx";

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);
        }

    });
});
