const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Customer } = this.entities;
    this.on('customerData', async (req) => {
        const jsonData = JSON.parse(req.data.jsonData); 
        const text = cds.transaction(req);
        const uploadPromises = jsonData.map((data) => {
            return text.run(
                INSERT.into(Customer).entries({
                    customer_id: data.customer_id || '',
                    customer_name: data.customer_name || '',
                    email: data.email || '',
                    address: data.address || '',
         })
        );
        });
        await Promise.all(uploadPromises);
        return { message: 'Data uploaded' };
    });
});