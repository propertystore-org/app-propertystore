import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models';
import { UploadService, UserService } from 'src/services';

@Component({
  selector: 'app-company-sign-up',
  templateUrl: './company-sign-up.component.html',
  styleUrls: ['./company-sign-up.component.scss']
})
export class CompanySignUpComponent implements OnInit {

  user: User;
  showLoader;
  constructor(
    private uploadService: UploadService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = {
      UserId: '',
      CompanyId: '',
      UserType: 'Admin',
      Name: '',
      Surname: '',
      Email: '',
      PhoneNumber: '',
      Password: '',
      Dp: '',
      CreateUserId: 'CompanySignUpComponent',
      ModifyUserId: 'CompanySignUpComponent',
      StatusId: '1',
      UserToken: ''
    };
  }

  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.uploadService.uploadFile(formData).subscribe(url => {
        this.user.Dp = `${environment.API_URL}/api/upload/${url}`;
      });

    });
  }

  save() {
    if (this.user.UserId && this.user.UserId.length > 5) {
      this.userService.updateUser(this.user);
    }
    else {
      this.userService.add(this.user).subscribe(data => {
        console.log(data);
      });
    }
  }

}
