const express = require('express')
const {PythonShell} = require("python-shell");

const port = process.env.PORT || 5000



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.get('/', (req, res) => {


    res.send('Welcome')

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        
        args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('vehicle_count.py', options, function (err) {
        if (err) throw err;
        console.log('finished');
      });
    }
    )





app.listen(port, () => console.log(`Server started on port ${port}`))
