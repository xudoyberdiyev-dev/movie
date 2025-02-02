package it.movie.movie_animation.config;

import it.movie.movie_animation.entity.enums.RoleName;
import it.movie.movie_animation.security.JwtSecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    JwtSecurityFilter securityFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/auth/get-me/**", "/api/v1/genre", "/api/v1/movie/**", "/api/v1/movie/list", "/api/v1/movie/random", "/api/v1/genres", "/api/v1/files/**", "/api/v1/movie/active/**", "/api/v1/movie/by-genre/**", "/api/v1/movie/new-serial/**", "/api/v1/movie/like/**").permitAll()
                        .requestMatchers("/api/v1/movie/**", "/api/v1/files/upload", "/api/v1/statistic", "/api/v1/news", "/api/v1/news/archive", "/api/v1/complaint/all-message", "/api/v1/complaint/delete/**").hasAuthority(RoleName.ADMIN.name())
                        .requestMatchers("/api/v1/news/active", "/api/v1/complaint/send", "/api/v1/movie/**", "/api/v1/comment/**","/api/v1/movie/like-send/**").hasAuthority(RoleName.USER.name())
                        .anyRequest().authenticated())
                .build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}