package it.movie.movie_animation.repository;

import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.entity.enums.SubCategoryType;
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

    List<Movie> findByGenresContaining(Genre genre);

    boolean existsByNameAndIdNot(String name, UUID id);


    @Query("SELECT m FROM Movie m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Movie> searchByNameIgnoreCase(@Param("name") String name); // Kino nom


}

