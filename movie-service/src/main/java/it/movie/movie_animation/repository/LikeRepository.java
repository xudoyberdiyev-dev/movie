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

public interface LikeRepository extends JpaRepository<LikeMovie, UUID> {
    Optional<LikeMovie> findByUserAndMovie(Users user, Movie movie);
    @Query("SELECT lm.movie FROM LikeMovie lm WHERE lm.user = :user AND lm.activeLike = true")
    List<Movie> findLikedMoviesByUser(@Param("user") Users user);


    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN TRUE ELSE FALSE END FROM LikeMovie l WHERE l.user = :user AND l.movie = :movie AND l.activeLike = :activeLike")
    boolean existsByUserAndMovieAndActiveLike(@Param("user") Users user, @Param("movie") Movie movie, @Param("activeLike") Boolean activeLike);

}
