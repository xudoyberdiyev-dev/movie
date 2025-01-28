package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.Movie;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.implment.controller.MovieControllerImpl;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqMovieDto;
import it.movie.movie_animation.payload.ReqVideoDto;
import it.movie.movie_animation.payload.ResVideoDto;
import it.movie.movie_animation.repository.MovieRepository;
import it.movie.movie_animation.service.MovieService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController implements MovieControllerImpl {
    private final MovieService movieService;
    private final MovieRepository movieRepository;

    @Override
    @GetMapping("/list")
    public HttpEntity<?> getMovie() {
        return ResponseEntity.ok(movieService.getMovie());
    }

    @Override
    @GetMapping("/active")//kino active true bolsa premyeralar oynasiga chiqadi flase bolganda yoqoladi
    public HttpEntity<?> getActiveMovie(boolean active) {
        List<Movie> activeMovies = movieService.getActiveMovies(true);
        return ResponseEntity.ok(activeMovies);
    }

    @Override
    @GetMapping("/random")//tasodifiy kinolar chiqadi
    public HttpEntity<?> getRandomMovies(@RequestParam(defaultValue = "5") int count) {
        List<Movie> randomMovies = movieRepository.findRandomMovies(count);
        return ResponseEntity.ok(randomMovies);
    }

    @Override
    @Transactional
    @GetMapping("/{id}")
    public HttpEntity<?> getOneMovie(@PathVariable UUID id, Authentication authentication) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ADMIN"));

        if (!isAdmin) {
            movie.setSeeSize(movie.getSeeSize() + 1);
            movieRepository.save(movie);
        }
        return ResponseEntity.ok(movie);
    }

    @Override
    @GetMapping("/by-genre")//genre boyicha kino chiqadi
    public ResponseEntity<List<Movie>> getMoviesByGenre(@RequestParam Genre genre) {
        List<Movie> movies = movieService.getMoviesByGenre(genre);
        return ResponseEntity.ok(movies);
    }

    @Override
    @PostMapping
    public HttpEntity<?> createMovie(@RequestBody ReqMovieDto reqMovieDto) {
        ApiResponse apiResponse = movieService.createMovie(reqMovieDto);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PutMapping("/{id}")
    public HttpEntity<?> updateMovie(@RequestBody ReqMovieDto movieDto, @PathVariable UUID id) {
        ApiResponse apiResponse = movieService.updateMovie(movieDto, id);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteMovie(@PathVariable UUID id) {
        ApiResponse apiResponse = movieService.deleteMovie(id);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PutMapping("/active/{id}")//kino activeni almashtrish true bolsa premyera oynasiga chiqadi false bolsa yoqoladi
    public HttpEntity<?> updateActive(@PathVariable UUID id, @RequestParam boolean active) {
        ApiResponse apiResponse = movieService.updateActive(id, active);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PostMapping("/add-serial/{id}")//serial qolgan qismlarni qoshish
    public HttpEntity<?> createSerial(@PathVariable UUID id, @RequestBody ReqVideoDto reqVideoDto) {
        ApiResponse apiResponse = movieService.createSerial(id, reqVideoDto);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @GetMapping("/new-serial/{id}")//qoshilgan seriallarni korish
    public HttpEntity<?> getSerial(@PathVariable UUID id) {
        List<ResVideoDto> newSerial = movieService.getNewSerial(id);
        return ResponseEntity.ok(newSerial);
    }

    @Override
    @DeleteMapping("/serial-delete/{id}")
    public HttpEntity<?> deleteSerial(@PathVariable UUID id, @RequestParam UUID videoId) {
        ApiResponse apiResponse = movieService.deleteSerial(id, videoId);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @PutMapping("/serial-edite/{id}")
    public HttpEntity<?> updateSerial(@PathVariable UUID id, @RequestParam UUID videoId, @RequestBody ReqVideoDto reqVideoDto) {
        ApiResponse apiResponse = movieService.updateSerial(id, videoId, reqVideoDto);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @PostMapping("/{movieId}")
    private HttpEntity<?> sendLike(@PathVariable UUID movieId, Authentication authentication) {
        ApiResponse apiResponse = movieService.sendLike(movieId, authentication);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.OK : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/{id}/like")
    private HttpEntity<?> getLike(@PathVariable UUID id, Authentication authentication) {
        ApiResponse like = movieService.getLike(id, authentication);
        return ResponseEntity.status(like.success() ? HttpStatus.OK : HttpStatus.CONFLICT).body(like);
    }
}
