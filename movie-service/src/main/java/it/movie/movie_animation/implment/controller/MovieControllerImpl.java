package it.movie.movie_animation.implment.controller;

import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.payload.ReqMovieDto;
import it.movie.movie_animation.payload.ReqVideoDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

import java.util.UUID;

public interface MovieControllerImpl {
    HttpEntity<?> getMovie();

    HttpEntity<?> createMovie(ReqMovieDto movieDto);

    HttpEntity<?> updateMovie(ReqMovieDto movieDto, UUID id);

    HttpEntity<?> deleteMovie(UUID id);

    HttpEntity<?> updateActive(UUID id, boolean isActive);

    HttpEntity<?> getActiveMovie(boolean active);

    HttpEntity<?> getRandomMovies(int count);

    HttpEntity<?> getOneMovie(UUID id);

    ResponseEntity<List<Movie>> getMoviesByGenre(Genre genre);

    HttpEntity<?> createSerial(UUID id, ReqVideoDto reqVideoDto);

    HttpEntity<?> getSerial(UUID id);

    HttpEntity<?> updateSerial(UUID id,UUID videoId, ReqVideoDto reqVideoDto);

    HttpEntity<?> deleteSerial(UUID id,UUID videoId);
}