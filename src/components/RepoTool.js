import axios from 'axios'

var GithubRepoUrl = 'https://api.github.com/users/MedPhysQC/repos'

var queryRepo = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(GithubRepoUrl).then((resp)=>{
            resolve(resp)
        },(error)=>{
            reject(error)
        })
    })
}
        
        
        
export default{
    queryRepo
} 