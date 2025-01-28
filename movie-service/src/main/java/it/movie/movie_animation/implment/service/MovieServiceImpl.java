package it.movie.movie_animation.implment.service;

import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.payload.*;

import java.util.List;
import java.util.UUID;

public interface MovieServiceImpl {
    List<ResMovieDto> getMovie();//umumiy kino ro'yxati get

    List<ResVideoDto> getNewSerial(UUID id);//bu seriallarni  qismlarini ro'yxati  get

    List<Movie> getActiveMovies(boolean active);//bu active true bolgan kinolar ro'yxati get

    ApiResponse createMovie(ReqMovieDto movieDto);//kinolar yaratish post

    ApiResponse createSerial(UUID id, ReqVideoDto reqVideoDto);//bu serial qolgan qismlarini yaratish  post

    ApiResponse updateMovie(ReqMovieDto movieDto, UUID id);//kinolarni taxrirlash  put

    ApiResponse updateActive(UUID id, boolean active);//kinoni activeni almashtrish put

    ApiResponse updateSerial(UUID id, UUID videoId, ReqVideoDto reqVideoDto);//bu serialni qoshilgan qismlarni taxrirlash put

    ApiResponse deleteMovie(UUID id);//kinoni o'chirib tashlash  delete

    ApiResponse deleteSerial(UUID id,UUID videoId); //bu serialni qoshilgan qismlarini o'chirib tashlaydi delete


}
