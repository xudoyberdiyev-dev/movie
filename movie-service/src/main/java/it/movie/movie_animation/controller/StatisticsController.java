package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.Statistics;
import it.movie.movie_animation.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/statistic")
@RequiredArgsConstructor
@CrossOrigin
public class StatisticsController {
    private final StatisticsService statisticsService;


    @GetMapping
    public Statistics getStatistics() {
        long usersCount = statisticsService.getAuthCount();
        long moviesCount = statisticsService.getMovieCount();
        return new Statistics(usersCount, moviesCount);
    }

}
