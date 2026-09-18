package com.sap.audit.bot.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import com.sap.audit.bot.model.JwtUser;

@Component
public class JwtGenerator {


    public String generate(JwtUser jwtUser) {

        Claims claims = Jwts.claims()
                .setSubject(jwtUser.getUserName());
        claims.put("userName", String.valueOf(jwtUser.getUserName()));
        claims.put("password", jwtUser.getPassword());
        claims.put("system", jwtUser.getSystem());
        claims.put("client", jwtUser.getClient());


        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, "auditbot")
                .compact();
    }
}
