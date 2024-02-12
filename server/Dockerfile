FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

COPY /pom.xml .

RUN mvn dependency:go-offline -B

COPY /src ./src

RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim

COPY --from=build /app/target/*.jar /app/app.jar

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/hackathon
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=postgres
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update

CMD ["java", "-jar", "/app/app.jar"]
