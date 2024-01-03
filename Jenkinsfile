pipeline {
    agent any 
    tools {
        nodejs 'Nodejs-18.7.0'
    }
    stages {
        stage('Get Code') {
            steps {
                git 'https://github.com/bhtoan2204/classroom'
            }
        }
        stage('Check Nodejs version') {
            steps {
                sh 'npm -v'
            }
        }
        stage('SonarQube analysis') {
            steps {
                echo 'Building...'
            }
        }
    }
}
