<?php

namespace App\Enums;

enum OrderStatus: string
{
    case OrderPlace = "Order placed";
    case OrderConfirmed = "Order confirmed";
    case PrintingStarted = "Printing started";
    case ReadForPickup = "Ready for pick-up";
    case Completed = "Completed";
}
