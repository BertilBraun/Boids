
# Boids

Boids is an artificial life program, developed by Craig Reynolds in 1986, which simulates the flocking behaviour of birds.

As with most artificial life simulations, Boids is an example of emergent behavior; that is, the complexity of Boids arises from the interaction of individual agents (the boids, in this case) adhering to a set of simple rules. 

More on [Wikipedia](https://en.wikipedia.org/wiki/Boids).


## Implementation

The rules applied in the simplest Boids world are as follows:

- separation: steer to avoid crowding local flockmates
- alignment: steer towards the average heading of local flockmates
- cohesion: steer to move towards the average position (center of mass) of local flockmates
- wall avoidance: steer await from incoming walls
- mouse avoidance: steer await from the mouse position if it is too close

## Optimisation

Implemented spacial seperation to gain a speed up of:

| Variant | time for 10.000 iter |
| ------- | -------------------- |
| old     | 32479.55 ms          |
| new     | 21859.13 ms          |

## Future

 - [x] implementation of optimisation using spacial seperation