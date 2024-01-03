pipeline {
    agent any 
    tools {
        nodejs 'Nodejs-18.7.0'
        sonarQubeScanner 'sonarQube-scanner'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/bhtoan2204/classroom'
            }
        }
        stage('Sonarqube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        def sonarqubeToken = credentials('Sonarqube-token')
                        if (sonarqubeToken == null) {
                            error('Sonarqube token is not defined')
                        }
                        sh "sonar-scanner -Dsonar.projectKey=classroom-website-key -Dsonar.sources=. -Dsonar.host.url=http://20.2.84.172/ -Dsonar.login=${sonarqubeToken}"
                    }
                }
            }
        }
    }
}
