package com.example.trocai.configs;

        import org.springframework.boot.context.properties.ConfigurationProperties;
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;
        import springfox.documentation.builders.PathSelectors;
        import springfox.documentation.builders.RequestHandlerSelectors;
        import springfox.documentation.service.ApiInfo;
        import springfox.documentation.service.Contact;
        import springfox.documentation.spi.DocumentationType;
        import springfox.documentation.spring.web.plugins.Docket;
        import springfox.documentation.swagger2.annotations.EnableSwagger2;

        import java.time.LocalDate;
        import java.time.LocalDateTime;
        import java.util.Collections;

@Configuration
@EnableSwagger2
@ConfigurationProperties("app.api")
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .apis(RequestHandlerSelectors.basePackage("com.example.trocai.controllers"))
                .paths(PathSelectors.any())
                .build()
                .directModelSubstitute(LocalDate.class, java.sql.Date.class).useDefaultResponseMessages(false)
                .directModelSubstitute(LocalDateTime.class, java.util.Date.class)
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfo("Trocaí API", "O Trocaí é uma ferramenta simples, transparente e amigável que possibilita alterações em escalas de trabalho com menos burocracia e arbitrariedades. Queremos que o trabalhador mais motivados e com mais autonomia sobre seus horários, sem afetar as necessidades do negócio.", "v1", "Terms of service", new Contact("Grupo 4", "https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-2-e4-proj-infra-t1-troca-comigo", "1337804@sga.pucminas.br"), "License of API", "Ooops", Collections.emptyList());
    }
}
