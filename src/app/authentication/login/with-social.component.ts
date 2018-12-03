import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import * as d3 from 'd3';

@Component({
  selector: 'app-with-social',
  templateUrl: './with-social.component.html'
})
export class WithSocialComponent implements OnInit {

    position = 'bottom-right';

    constructor(private authService: AuthService, private router:Router,private toastyService: ToastyService) { }

    ngOnInit() {

        // var width = 960,
        //     height = 500;
        // var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; }),
        //     root = nodes[0],
        //     color = d3.scale.category10();
        // root.radius = 0;
        // root.fixed = true;
        // var force = d3.layout.force()
        //     .gravity(0.05)
        //     .charge(function(d, i) { return i ? 0 : -2000; })
        //     .nodes(nodes)
        //     .size([width, height]);
        // force.start();
        // var svg = d3.select("body").append("svg")
        //     .attr("width", width)
        //     .attr("height", height);
        // svg.selectAll("circle")
        //     .data(nodes.slice(1))
        //     .enter().append("circle")
        //     .attr("r", function(d) { return d.radius; })
        //     .style("fill", function(d, i) { return color(i % 3); });
        // force.on("tick", function(e) {
        //     var q = d3.geom.quadtree(nodes),
        //         i = 0,
        //         n = nodes.length;
        //     while (++i < n) q.visit(collide(nodes[i]));
        //     svg.selectAll("circle")
        //         .attr("cx", function(d) { return d.x; })
        //         .attr("cy", function(d) { return d.y; });
        // });
        // svg.on("mousemove", function() {
        //     var p1 = d3.mouse(this);
        //     root.px = p1[0];
        //     root.py = p1[1];
        //     force.resume();
        // });
        // function collide(node) {
        //     var r = node.radius + 16,
        //         nx1 = node.x - r,
        //         nx2 = node.x + r,
        //         ny1 = node.y - r,
        //         ny2 = node.y + r;
        //     return function(quad, x1, y1, x2, y2) {
        //         if (quad.point && (quad.point !== node)) {
        //             var x = node.x - quad.point.x,
        //                 y = node.y - quad.point.y,
        //                 l = Math.sqrt(x * x + y * y),
        //                 r = node.radius + quad.point.radius;
        //             if (l < r) {
        //                 l = (l - r) / l * .5;
        //                 node.x -= x *= l;
        //                 node.y -= y *= l;
        //                 quad.point.x += x;
        //                 quad.point.y += y;
        //             }
        //         }
        //         return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        //     };
        // }
    }



    addToast(options) {
        if (options.closeOther) {
            this.toastyService.clearAll();
        }
        this.position = options.position ? options.position : this.position;
        const toastOptions: ToastOptions = {
            title: options.title,
            msg: options.msg,
            showClose: options.showClose,
            timeout: options.timeout,
            theme: options.theme,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added removed!');
            }
        };

        switch (options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }




    onSubmit(f: NgForm) {

        this.authService.login(f.value.email, f.value.password)
            .subscribe(
                response => console.log(response),
                error =>{
                    this.addToast({title:'Login ou password est incorrect', msg: error, timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                    console.log(error);
                     },
                () => this.router.navigate(['utilisateur'])
            )
    }

}
