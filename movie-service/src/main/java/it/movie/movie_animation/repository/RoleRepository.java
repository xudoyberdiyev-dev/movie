package it.movie.movie_animation.repository;

import it.movie.movie_animation.entity.Role;
import it.movie.movie_animation.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    boolean existsByRoleName(RoleName value);
}
