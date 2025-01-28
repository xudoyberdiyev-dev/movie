package it.movie.movie_animation.service;

import it.movie.movie_animation.entity.enums.SubCategoryType;
import it.movie.movie_animation.repository.AuthRepository;
import it.movie.movie_animation.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final MovieRepository movieRepository;
    private final AuthRepository authRepository;

    public long getMovieCount() {
        return movieRepository.count();
    }

    public long getAuthCount() {
        return authRepository.count();
    }


}
