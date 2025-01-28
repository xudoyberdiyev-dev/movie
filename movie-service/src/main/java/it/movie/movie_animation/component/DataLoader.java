package it.movie.movie_animation.component;

import it.movie.movie_animation.entity.Role;
import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.entity.enums.RoleName;
import it.movie.movie_animation.repository.AuthRepository;
import it.movie.movie_animation.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataLoader implements CommandLineRunner {
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String initMode;

    @Autowired
    AuthRepository authRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (initMode.equals("create-drop") || initMode.equals("create")) {
            for (RoleName value : RoleName.values()) {
                if (!roleRepository.existsByRoleName(value)) {
                    roleRepository.save(new Role(value));
                }
            }
            Set<Role> roleSet = new HashSet<>(roleRepository.findAll());
            String encryptedPassword = new BCryptPasswordEncoder().encode("movie1234");
            authRepository.save(
                    Users.builder()
                            .name("Azizbek")
                            .surname("Xudoyberdiyev")
                            .roles(roleSet)
                            .email("movie@gmail.com")
                            .password(encryptedPassword)
                            .accountNonExpired(true)
                            .accountNonLocked(true)
                            .credentialsNonExpired(true)
                            .enabled(true)
                            .build()
            );
        }
    }
}

