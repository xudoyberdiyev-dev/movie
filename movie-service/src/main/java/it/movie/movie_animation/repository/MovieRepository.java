package it.movie.movie_animation.repository;

import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.entity.enums.SubCategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface MovieRepository extends JpaRepository<Movie, UUID> {
    boolean existsMovieByNameEqualsIgnoreCase(String name);

    List<Movie> findByActive(boolean active);

    @Query(value = "SELECT * FROM movie ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<Movie> findRandomMovies(@Param("count") int count);

    Page<Movie> findByGenre(Genre genre, Pageable pageable);

    boolean existsByNameAndIdNot(String name, UUID id);


    List<Movie> findByNameContainingIgnoreCase(String name);

}

