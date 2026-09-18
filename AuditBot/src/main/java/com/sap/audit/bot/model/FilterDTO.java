 package com.sap.audit.bot.model;
 
 import java.util.List;
 
 public class FilterDTO {
   private String name;
   
   public String getName() {
     return this.name;
   } private List<FilterParamDTO> params;
   public void setName(String name) {
     this.name = name;
   }
   public List<FilterParamDTO> getParams() {
     return this.params;
   }
   public void setParams(List<FilterParamDTO> params) {
     this.params = params;
   }
 }

