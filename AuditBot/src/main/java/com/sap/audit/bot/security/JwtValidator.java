package com.sap.audit.bot.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.audit.bot.dao.DestinationSource;
import com.sap.audit.bot.exception.AuditBotAuthenticationException;
import com.sap.audit.bot.model.JwtUser;

@Component
public class JwtValidator {
	



    private String secret = "auditbot";

    public JwtUser validate(String token)  {

    	
    	
        JwtUser jwtUser = null;
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            jwtUser = new JwtUser();

            jwtUser.setUserName((String)body.get("userName"));
            jwtUser.setPassword((String) body.get("role"));
            jwtUser.setClient((String) body.get("client"));
            jwtUser.setSystem((String) body.get("system"));
            
        }
        catch (Exception e) {
            System.out.println(e);
        }
        


        return jwtUser;
    }
}
