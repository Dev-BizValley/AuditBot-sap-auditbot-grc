set path=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot\bin
set SC_LIB_ROOT=C:\Users\revan\javaApp\AuditBot\target\AuditBot-0.0.1-SNAPSHOT.jar;C:\Users\revan\javaApp\AuditBot\sapjco_linux\sapjco3.jar
set SC_MQLIB=C:\Users\revan\javaApp\AuditBot\target\classes\com\sap\audit\bot
set classpath=%SC_LIB_ROOT%;%SC_MQLIB%;
java -cp "%classpath%" org.springframework.boot.loader.PropertiesLauncher --system.config.path=SystemConfig.csv >> SAPLog.log &
pause

