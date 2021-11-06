import { LightningElement, track,wire,api } from 'lwc';
import ShowContacts from '@salesforce/apex/ShowContacts.ShowContacts';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import deleteContact from '@salesforce/apex/ShowContacts.deleteContact';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';



export default class ShowContactsList extends NavigationMixin(LightningElement) 
 {
     @track error;
     @api contacts;
     @track resultofwiredContacts;
     refreshData;
     
     @wire(ShowContacts ) ContactList(result) 
     {
         this.refreshData = result;
         if(result.data)
         {
                this.contacts = result.data;
                this.error = undefined;
         }
         else if (result.error)
          {
          this.error = result.error
          this.contacts = undefined;
          }
    }
    //  wiredContacts({data,error})

    //  {        
    //      this.refreshData=data;
    //      if(data)
    //      {
    //         this.resultofwiredContacts=data;
    //         this.contacts=data;
            
    //      }
    //      else if(error)
    //      {
    //         this.error=error;
    //         this.contacts=undefined;
    //      }
    //  }
     DeleteContactRecord(event)
     {
         
            const recordId= event.target.dataset.recordid;
            //return refreshApex(this.refreshData);
        
            deleteRecord(recordId)
            .then( ()=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Success',
                        message : 'Contact Record Is Successfully Deleted',
                        variant : 'success'                        
                         })                         
                     );
                
                    // const datacheck = this.refreshLWC();
                    // console.log( 'hkjhiun hii'+datacheck);

                    //  return refreshApex(this.resultofwiredContacts);
                     //eval("$A.get('e.force:refreshView').fire();");  
                     return refreshApex(this.refreshData);

                })  
                .catch(error => {
                    this.error = error;
                    console.log(">>> valueList... "+error);
                }); 
                       
    }   
    refresComponentl()
     { 
    //                console.log(">>> check " );

                 return refreshApex(this.refreshData);
 
    }
    
      CreateNewRecordNev()
      {
        const defaultValues=encodeDefaultFieldValues({});
        console.log(defaultValues);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
      }
      EditRecord1( event)
       
        {            
            console.log( 'hello');
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: event.currentTarget.dataset.id,    
                    objectApiName: 'Contact',
                    actionName: 'edit'
                },                
            });     
      }
   
}
 