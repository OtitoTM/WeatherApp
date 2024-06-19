import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { PhotoComponent } from './photo/photo.component';


export const routes: Routes = [
    { path: 'home',
        component: HomeComponent },
    {
        path: 'news',
        component: NewsComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'photo',
        component: PhotoComponent
    },

];
