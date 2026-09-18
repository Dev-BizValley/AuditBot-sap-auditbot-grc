package com.sap.audit.bot.dao;

import com.sap.audit.bot.model.JwtUser;
import com.sap.conn.jco.JCoDestination;
import org.springframework.stereotype.Component;

@Component
public interface DestinationSource {
  JCoDestination getDestinationByUser(JwtUser paramJwtUser);
  
  void setDestinationByUser(JwtUser paramJwtUser, JCoDestination paramJCoDestination);
}

