package it.movie.movie_animation.implment.service;

import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqNewsDto;

import java.util.UUID;

public interface NewsServiceImpl {
    ApiResponse addNews(ReqNewsDto reqNewsDto);

    ApiResponse deleteNews(UUID id);

    void archiveExpiredNews();
}
