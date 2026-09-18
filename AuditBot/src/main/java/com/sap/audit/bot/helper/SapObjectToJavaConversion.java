 package com.sap.audit.bot.helper;
 
 import com.sap.conn.jco.JCoField;
 import com.sap.conn.jco.JCoFieldIterator;
 import com.sap.conn.jco.JCoTable;

 import java.text.Format;
 import java.text.SimpleDateFormat;
 import java.util.*;


 public class SapObjectToJavaConversion
 {
   public static List<Map<String, Object>> getTableParameter(JCoTable table) {
     List<Map<String, Object>> list = new ArrayList<>();
     for (int i = 0; i < table.getNumRows(); i++) {
       
       table.setRow(i);
       JCoFieldIterator iter = table.getFieldIterator();
       Map<String, Object> map = new LinkedHashMap<>();
       while (iter.hasNextField()) {
         
         JCoField f = iter.nextField();
         try {
           map.put(f.getName(), table.getValue(f.getName()));
         } catch (Exception e) {
           map.put(f.getName(), table.getString(f.getName()));
         }
       } 
       list.add(map);
     } 
     return list;
   }
   
   
   public static List<Map<String, Object>>  getTableParameterForLicence(JCoTable table) {
	     List<Map<String, Object>> list = new ArrayList<>();
	     for (int i = 0; i < table.getNumRows(); i++) {
	       
	       table.setRow(i);
	       JCoFieldIterator iter = table.getFieldIterator();
	       Map<String, Object> map = new LinkedHashMap<>();
	       while (iter.hasNextField()) {
	         
	         JCoField f = iter.nextField();
	         map.put(f.getName(), table.getString(f.getName()));
	       } 
	       list.add(map);
	     } 
	     return list;
	   }

     public static String getTime() {
         Format f = new SimpleDateFormat("HHmmss");
         return f.format(new Date());
     }
 }

