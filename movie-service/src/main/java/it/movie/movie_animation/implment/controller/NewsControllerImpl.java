package it.movie.movie_animation.implment.controller;

import it.movie.movie_animation.payload.ReqNewsDto;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface NewsControllerImpl {
    HttpEntity<?> getUserActiveNews();

    HttpEntity<?> archiveNewsAdmin();

    HttpEntity<?> addNews(ReqNewsDto reqNewsDto);


    HttpEntity<?>deleteNews(UUID id);
}
