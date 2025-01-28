package it.movie.movie_animation.repository;

import it.movie.movie_animation.entity.Comment;
import it.movie.movie_animation.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByMovie(Movie movie); // Muayyan kino bo'yicha izohlarni olish
}
