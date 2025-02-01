package it.movie.movie_animation.repository;

import it.movie.movie_animation.entity.Like;
import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;
import java.util.UUID;

public interface LikeRepository extends JpaRepository<Like,UUID> {
    Optional<Like> findByMovieAndUsers(Movie movie, Users user);


}
