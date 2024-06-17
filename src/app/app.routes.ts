import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
    { path: 'home',
        component: HomeComponent },
    {
        path: 'news',
        component: NewsComponent
    }
];
