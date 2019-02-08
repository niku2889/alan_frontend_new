import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import { AboutUsService } from './AboutUs.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-AboutUs',
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.scss'],
  providers: [AboutUsService]
})
export class AboutUsComponent implements OnInit {

  teamData: any;
  testimonialData: any;
  missionVisionData: any;
  aboutInfo: any[] = [];

  aboutData: any[] = [];

  image: any[] = [
    "../../assets/images/about-us.jpg",
    "../../assets/images/our-mission.jpg",
    "../../assets/images/our-vision.jpg",
    "../../assets/images/about-contact.jpg"
  ]

  constructor(private embryoService: EmbryoService, private service: AboutUsService, private titleService: Title, private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'AboutUs - Our Vision,Our Mission,Our Team and more' });
    this.setTitle('AboutUs - Our Vision,Our Mission,Our Team and more')
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.getDiscription();
    this.getTeam();
  }

  getDiscription() {
    this.service.getDiscription()
      .subscribe(data => {
        this.aboutInfo = data;
        let about: {
          title: '',
          des: '',
          image: ''
        }
        for (let i = 0; i < 4; i++) {
          about = {
            title: this.aboutInfo[0]['title' + (i + 1)],
            des: this.aboutInfo[0]['para' + (i + 1)],
            image: this.image[i]
          }
          this.aboutData.push(about);
        }
      });
  }

  getTeam() {
    this.service.getTeam()
      .subscribe(data => {
        this.teamData = data;

      });
  }


}

