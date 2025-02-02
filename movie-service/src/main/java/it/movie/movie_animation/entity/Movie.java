package it.movie.movie_animation.entity;

import it.movie.movie_animation.entity.enums.Age;
import it.movie.movie_animation.entity.enums.Genre;
import it.movie.movie_animation.entity.enums.SubCategoryType;
import it.movie.movie_animation.entity.templates.AbsEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = false)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Movie extends AbsEntity {

    @Column(nullable = false)
    private String name; //kino nomi

    @Column(nullable = false)
    private Integer movieTime; // kino qancha minutligi

    @Column(nullable = false)
    private Integer movieYear; // kini chiqgan yili

    @Column(nullable = false)
    private String movieCountry; // kino davlati

    @Column(nullable = false)
    private String language; // kino tili

    @Column(nullable = false)
    private Integer botId; // bu bot uchun kino id sini terganda chiqadi

    @Column(nullable = false)
    private String description; //kini haqida

    private String img; //film rasmi uchun sdm orqali buladi
    private String video; //filni vedyosi sdm orqali qilinadi

    @OneToMany
    private List<Video> videos = new ArrayList<>();//bu serial kategorusiga tegishli yani serialning qismini yana qoshish

    @Enumerated(EnumType.STRING)
    private SubCategoryType subCategoryType;//eng katta bo'limlar

    @Enumerated(EnumType.STRING)
    private Age age; //yosh chegarasi


    @ElementCollection
    @CollectionTable(name = "movie_genres", joinColumns = @JoinColumn(name = "movie_id"))
    @Enumerated(EnumType.STRING)
    private List<Genre> genres;


    private double seeSize = 0; // nechi kishi kurganini pasmotr


    private int likes;


    private boolean active; // bu kino yangimi va premyeralar oynasiga chiqsinmi


}
