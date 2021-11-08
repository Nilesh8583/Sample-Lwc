public with sharing class ShowContacts {
    @AuraEnabled (cacheable=true)
    public static List<Contact> ShowContacts() 
    {
        List<Contact> ContactList=[Select Id,LastName,Email,Department,Phone,FirstName From Contact  LIMIT 15];
        return ContactList;
    }
     
}
     