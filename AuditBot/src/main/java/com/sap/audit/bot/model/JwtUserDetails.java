 package com.sap.audit.bot.model;
 
 import java.util.Collection;
 import java.util.List;
 import org.springframework.security.core.GrantedAuthority;
 import org.springframework.security.core.userdetails.UserDetails;
 
 
 
 public class JwtUserDetails
   implements UserDetails
 {
   private String userName;
   private String token;
   private String id;
   private Collection<? extends GrantedAuthority> authorities;
   
   public JwtUserDetails(String userName, String id, String token, List<GrantedAuthority> grantedAuthorities) {
     this.userName = userName;
     this.id = id;
     this.token = token;
     this.authorities = grantedAuthorities;
   }
 
   
   public Collection<? extends GrantedAuthority> getAuthorities() {
     return this.authorities;
   }
 
   
   public String getPassword() {
     return null;
   }
 
   
   public String getUsername() {
     return this.userName;
   }
 
   
   public boolean isAccountNonExpired() {
     return true;
   }
 
   
   public boolean isAccountNonLocked() {
     return true;
   }
 
   
   public boolean isCredentialsNonExpired() {
     return true;
   }
 
   
   public boolean isEnabled() {
     return true;
   }
 
   
   public String getUserName() {
     return this.userName;
   }
   
   public String getToken() {
     return this.token;
   }
 
   
   public String getId() {
     return this.id;
   }
 }
