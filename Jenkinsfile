pipeline {
  agent any
  stages {
    stage('SonarQube analysis') {
      steps {
        withSonarQubeEnv() {
          def scannerHome = tool 'SonarScanner 4.6.0';
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
  }
}
