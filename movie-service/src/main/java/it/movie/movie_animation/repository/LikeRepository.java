package it.movie.movie_animation.repository;

import it.movie.movie_animation.entity.LikeMovie;
import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LikeRepository extends JpaRepository<LikeMovie,UUID> {
    Optional<LikeMovie> findByUserAndMovie(Users user, Movie movie);
    boolean existsByMovieIdAndUserId(UUID movieId, UUID userId);
    List<LikeMovie> findByUser(Users user);


}
