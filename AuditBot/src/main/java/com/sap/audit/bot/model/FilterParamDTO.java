 package com.sap.audit.bot.model;
 
 public class FilterParamDTO
 {
   private String ZID;
   
   public String getZID() {
     return this.ZID;
   } private String ZDESC; private int ZTYPE;
   public void setZID(String zID) {
     this.ZID = zID;
   }
   public String getZDESC() {
     return this.ZDESC;
   }
   public void setZDESC(String zDESC) {
     this.ZDESC = zDESC;
   }
   public int getZTYPE() {
     return this.ZTYPE;
   }
   public void setZTYPE(int zTYPE) {
     this.ZTYPE = zTYPE;
   }
 }
