package it.movie.movie_animation.repository;


import it.movie.movie_animation.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin
public interface AuthRepository extends JpaRepository<Users, UUID> {
    UserDetails findByEmail(String email);


    boolean existsUsersByEmail(String email);
}
