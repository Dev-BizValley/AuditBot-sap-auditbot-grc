 package com.sap.audit.bot.dao;
 
 import com.sap.audit.bot.model.JwtUser;
 import com.sap.conn.jco.JCoDestination;
 import java.util.HashMap;
 import java.util.Map;
 import org.springframework.stereotype.Component;
 
 @Component
 public class DestinationSourceImpl
   implements DestinationSource
 {
   private Map<String, Map<String, Map<String, JCoDestination>>> map = new HashMap<>();
 
   
   public JCoDestination getDestinationByUser(JwtUser jwtUser) {
     if (this.map.containsKey(jwtUser.getSystem())) {
       if (((Map)this.map.get(jwtUser.getSystem())).containsKey(jwtUser.getClient())) {
         if (((Map)((Map)this.map.get(jwtUser.getSystem())).get(jwtUser.getClient())).containsKey(jwtUser.getUserName())) {
           return (JCoDestination)((Map)((Map)this.map.get(jwtUser.getSystem())).get(jwtUser.getClient())).get(jwtUser.getUserName());
         }
       } else {
         
         return null;
       } 
     } else {
       return null;
     } 
     return null;
   }


     public void setDestinationByUser(JwtUser jwtUser, JCoDestination destination) {
         if (this.map.containsKey(jwtUser.getSystem())) { //If a system exists add the client to it
             if (((Map)this.map.get(jwtUser.getSystem())).containsKey(jwtUser.getClient())) { //If the client already exists add the user to it
                 ((Map)((Map)this.map.get(jwtUser.getSystem())).get(jwtUser.getClient())).put(jwtUser.getUserName(), destination);
             } else { //If the client doesn't exists add the client with the user
                 Map<String, JCoDestination> userDestination = new HashMap<>();
                 userDestination.put(jwtUser.getUserName(), destination);
                 ((Map)this.map.get(jwtUser.getSystem())).put(jwtUser.getClient(),userDestination);
             }
         } else { //If the system is not there add the system, client and user
             Map<String, JCoDestination> userDestination = new HashMap<>();
             userDestination.put(jwtUser.getUserName(), destination);
             Map<String, Map<String, JCoDestination>> clientMap = new HashMap<>();
             clientMap.put(jwtUser.getClient(), userDestination);
             this.map.put(jwtUser.getSystem(), clientMap);
         }

     }
 }


