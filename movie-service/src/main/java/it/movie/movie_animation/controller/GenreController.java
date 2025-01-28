package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.enums.Genre;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/genres")
public class GenreController {

    @GetMapping
    public List<Genre> getAllGenres() {
        return Arrays.asList(Genre.values());
    }
}
