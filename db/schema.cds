namespace com.satinfotech.jk;
using { cuid, managed } from '@sap/cds/common';



entity Customer : cuid, managed
  {
    key ID            : UUID;
    @title: 'CustomerID'
    customer_id: String(20) ;
    @title: 'Customer Name'
    customer_name: String(20) ;
    @title: 'E-mail'
    email: String(20) ;
    @title: 'Address'
    address: String(20);

     ord : Composition of many Order on ord.orderNumber=$self;
};

entity Order: cuid , managed {
      key ID            : UUID; 

    @title:'Order Number'
    orderNumber: Association to one Customer;
    
    @title: 'Order Date'
    orderDate: Date;
    
    @title: 'Shipping Address'
    shippingAddress: String(100);
    
    @title: 'Billing Address'
    billingAddress: String(100);
    
    @title: 'Total Amount'
    totalAmount: Decimal(10, 2);
   
}