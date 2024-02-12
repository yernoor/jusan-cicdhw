pipeline 
{
    agent any
    stages {
        stage('Git') {
            steps {
                git url: 'https://github.com/yernoor/jusan-cicdhw.git', branch: 'main'
            }
        }
        stage('Build Images') {
            steps {
                script {
                    sh 'docker build -t frontend ./client'
                    sh 'docker build -t backend ./server'
                    
                }
            }
        }
        stage('Run images') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name frontend frontend'
                    sh 'docker run -d -p 5000:5000 --name backend backend -e SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/hackathon \
                    -e SPRING_DATASOURCE_USERNAME=postgres -e SPRING_DATASOURCE_PASSWORD=postgres \
                    -e SPRING_JPA_HIBERNATE_DDL_AUTO=update'
                    sh 'docker run -d -p 5433:5432 --name db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=hackathon postgres'
                }
            }
        }
    
    }    
}