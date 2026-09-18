package com.sap.audit.bot.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;










@Component
public class DestinationConfig
{
  @Value("${jco.client.sysnr}")
  private String JCO_SYSNR;
  @Value("${jco.client.lang}")
  private String JCO_LANG;
  @Value("${system.config.path}")
  private String System_Config_Path;
  @Value("${jco.destination.pool_capacity}")
  private String JCO_POOL_CAPACITY;
  @Value("${jco.destination.peak_limit}")
  private String JCO_PEAK_LIMIT;
  @Value("${CONFIGURED_USER}")
  private String JCO_AUTH_TYPE_CONFIGURED_USER;

  @Value("${log.path}")
  private String LOG_PATH;

  public String getLOG_PATH() {
    return LOG_PATH;
  }

  public void setLOG_PATH(String LOG_PATH) {
    this.LOG_PATH = LOG_PATH;
  }

  public String getJCO_SYSNR() {
    return this.JCO_SYSNR;
  }
  
  public void setJCO_SYSNR(String jCO_SYSNR) {
    this.JCO_SYSNR = jCO_SYSNR;
  }

  
  public String getJCO_LANG() {
    return this.JCO_LANG;
  }
  
  public void setJCO_LANG(String jCO_LANG) {
    this.JCO_LANG = jCO_LANG;
  }
  
  public String getJCO_POOL_CAPACITY() {
    return this.JCO_POOL_CAPACITY;
  }
  
  public void setJCO_POOL_CAPACITY(String jCO_POOL_CAPACITY) {
    this.JCO_POOL_CAPACITY = jCO_POOL_CAPACITY;
  }
  
  public String getJCO_PEAK_LIMIT() {
    return this.JCO_PEAK_LIMIT;
  }
  
  public void setJCO_PEAK_LIMIT(String jCO_PEAK_LIMIT) {
    this.JCO_PEAK_LIMIT = jCO_PEAK_LIMIT;
  }
  
  public String getJCO_AUTH_TYPE_CONFIGURED_USER() {
    return this.JCO_AUTH_TYPE_CONFIGURED_USER;
  }
  
  public void setJCO_AUTH_TYPE_CONFIGURED_USER(String jCO_AUTH_TYPE_CONFIGURED_USER) {
    this.JCO_AUTH_TYPE_CONFIGURED_USER = jCO_AUTH_TYPE_CONFIGURED_USER;
  }
  
  public String getSystem_Config_Path() {
    return this.System_Config_Path;
  }
  
  public void setSystem_Config_Path(String system_Config_Path) {
    this.System_Config_Path = system_Config_Path;
  }
}

