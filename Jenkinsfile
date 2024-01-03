pipeline {
    agent any 

    stages {
        stage('Get Code') {
            steps {
                git 'https://github.com/bhtoan2204/classroom'
            }
        }
        stage('SonarQube analysis') {
            steps {
                echo 'Building...'
            }
        }
    }
}
