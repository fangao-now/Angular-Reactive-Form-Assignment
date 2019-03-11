import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  statuses = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  forbiddenProjectNameList = ['test'];


  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required], this.forbiddenProjectNames.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

    // custom validator
    forbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (this.forbiddenProjectNameList.indexOf(control.value) !== -1) {
            resolve({ 'nameIsForbidden': true });
          } else {
            resolve(null);
          }
        }, 1000);
      });
      return promise;
    }
}
