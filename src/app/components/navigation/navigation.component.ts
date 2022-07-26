import { Component, OnInit } from '@angular/core';

export interface Link {
  name: string;
  icon: string;
  href: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor() {}

  links: Link[] = [
    { name: 'Homepage', icon: 'home', href: '#' },
    { name: 'Pages', icon: 'article', href: '#' },
    { name: 'Groups', icon: 'group', href: '#' },
    { name: 'Marketplace', icon: 'storefront', href: '#' },
    { name: 'Friends', icon: 'person', href: '#' },
    { name: 'Settings', icon: 'settings', href: '#' },
    { name: 'Profile', icon: 'account_box', href: '#' },
  ];

  ngOnInit(): void {}
}
