using {com.satinfotech.jk as orders} from '../db/schema';

service jk {
    entity Customer as projection on orders.Customer;
    action customerData(jsonData: String);
}

annotate jk.Customer with @odata.draft.enabled;

annotate jk.Customer with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Label:'CustomerID',
            Value : customer_id
        },
        {
            $Type : 'UI.DataField',
            Value : customer_name
        },
        {
            $Type : 'UI.DataField',
            Value : email
        },
        {
            $Type : 'UI.DataField',
            Value : address
        }
    ],  
);
annotate jk.Customer with @(       
    UI.FieldGroup #ProductInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
            $Type : 'UI.DataField',
            
            Value : customer_id
        },
        {
            $Type : 'UI.DataField',
            Value : customer_name
        },
        {
            $Type : 'UI.DataField',
            Value : email
        },
        {
            $Type : 'UI.DataField',
            Value : address
        }
        
        ],
    },


    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'CustomerInfoFacet',
            Label : 'Customer Information',
            Target : '@UI.FieldGroup#ProductInformation',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'OrderGeneralInformation',
            Label : 'General Information',
            Target : 'ord/@UI.LineItem',
        },
    ],    
);


annotate jk.Order with @(
    UI.LineItem: [
        {
            $Type:'UI.DataField',
            Value: orderNumber_ID
        },
        {
            $Type:'UI.DataField',
            Value: orderDate
        },
        {
            $Type:'UI.DataField',
            Value: shippingAddress
        },
        {
            $Type:'UI.DataField',
            Value: billingAddress
        },
        {
            $Type:'UI.DataField',
            Value: totalAmount
        }
    ]
);

annotate jk.Order with @(
    UI.FieldGroup #OrderDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
        {
            $Type:'UI.DataField',
            Value: orderNumber_ID
        },
        {
            $Type:'UI.DataField',
            Value: orderDate
        },
        {
            $Type:'UI.DataField',
            Value: shippingAddress
        },
        {
            $Type:'UI.DataField',
            Value: billingAddress
        },
        {
            $Type:'UI.DataField',
            Value: totalAmount
        }
    ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'OrderGeneralInformation',
            Label : 'General Information',
            Target : '@UI.FieldGroup#OrderDetails',
        },
    ]
);
