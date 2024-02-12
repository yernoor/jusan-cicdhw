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
        stage('Run images') { // Change docker run to docker compose
            steps {
                script {
                    sh 'docker compose up -d'
                }
            }
        }
    
    }    
}